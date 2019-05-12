import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {Table, Input, InputNumber, Popconfirm, Form,Select} from 'antd';
import withAxios from '../hoc/withAxios.js'
const Option = Select.Option;


const FormItem = Form.Item;
const EditableContext = React.createContext();


class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'select') {
      return <Select >
                  <Option value="民族文化">民族文化</Option>
                  <Option value="传统工艺">传统工艺</Option>
                  <Option value="茶艺茶道">茶艺茶道</Option>
                  <Option value="特产美食">特产美食</Option>
                  <Option value="珠宝首饰">珠宝首饰</Option>
                  <Option value="文化创意">文化创意</Option>
                  <Option value="个性定制">个性定制</Option>
            </Select>;
    }
    return <Input />;
  };


  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer >
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps} >
              {editing ? (
                <FormItem style={{ margin: 0 }} >
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        data:[], 
        editingKey: '' 
    };
    this.columns = [
      
      {
        title: 'ID',
        dataIndex: 'goods_id',
        width: '8%',
        editable: false,
      },
      {
        title:"描述",
        dataIndex: 'goods_name',
        width:"30%",
        editable:true
      },
      {
        title: '价格',
        dataIndex: 'goods_price',
        width: '10%',
        editable: true,
      },
      {
        title: '销量',
        dataIndex: 'goods_salenum',
        width: '10%',
        editable: false,
      },
      {
        title: '主分类',
        dataIndex: 'zhufenlei',
        width: '12%',
        editable: true,
      },
      {
        title: '子分类',
        dataIndex: 'zifenlei',
        width: '12%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return (
            <div>

              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
            <div>
                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>edit</a>
                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                    <a style={{marginLeft:"50px"}} href="javascript:;">Delete</a>
                </Popconfirm>
            </div>
              )}

            </div>
          );
        },
      },
    ];
  }

   handleDelete = async (key) => {
    const dataSource = [...this.state.data];
    this.setState({ data: dataSource.filter(item => item.key !== key) });
    let change = await this.props.axios.get('/adduser/delete',{
        params:{
            key:key
        }
    })
  }


  async componentWillMount(){
    
    let datalist = await this.props.axios.get('/adduser/goodlist',{

    })
    this.setState({
        data:datalist.data
    })
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        
        
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log("xxx",key)
        this.props.axios.post('/adduser/changeGood',{
            goods_price:row.goods_price,
            goods_name:row.goods_name,
            zhufenlei:row.zhufenlei,
            zifenlei:row.zifenlei,
            key:key
        })
        this.setState({ data: newData, editingKey: '' });
      } else {
        
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
 

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        },{

          record,
          inputType: col.dataIndex === 'zhufenlei' ? 'select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table ref="table"
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

let Glist = Form.create()(EditableTable);

Glist = withAxios(Glist)

export default Glist;











