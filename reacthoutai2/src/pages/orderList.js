import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {Table, Input, InputNumber, Popconfirm, Form,Select,Spin, Alert} from 'antd';
import withAxios from '../hoc/withAxios.js'
const Option = Select.Option;


const FormItem = Form.Item;
const EditableContext = React.createContext();


class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'select') {
      return <Select >
                  <Option value="未付款">未付款</Option>
                  <Option value="已付款">已付款</Option>
                  <Option value="未发货">未发货</Option>
                  <Option value="已发货">已发货</Option>
                  <Option value="已签收">已签收</Option>
                  
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
        title: '买家',
        dataIndex: 'name',
        width: '8%',
        editable: false,
      },
      {
        title:"商品",
        dataIndex: 'goods_name',
        width:"30%",
        editable:true
      },
      {
        title:"下单时间",
        dataIndex: 'key',
        width:"10%",
        editable:false
      },
      {
        title: '金额',
        dataIndex: 'goods_price',
        width: '10%',
        editable: true,
      },
      {
        title: '数量',
        dataIndex: 'number',
        width: '10%',
        editable: true,
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        width: '12%',
        editable: true,
      },
      {
        title: '收货地址',
        dataIndex: 'address',
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
    let change = await this.props.axios.get('/adduser/deleteorder',{
        params:{
            key:key
        }
    })
  }


  async componentWillMount(){
    
    let datalist = await this.props.axios.get('/adduser/orderlist',{

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
        console.log("xxx",row)
        this.props.axios.post('/adduser/changeorder',{
            address:row.address,
            goods_name:row.goods_name,
            goods_price:row.goods_price*row.number,
            number:row.number,
            status:row.status,
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
    console.log("xxx",this.state.data)
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
          inputType: col.dataIndex === 'status' ? 'select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        
        }),
      };
    });

    return this.state.data.length != 0?(
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
      ):<Spin tip="Loading...">
    <Alert
      message="Alert message title"
      description="Further details about the context of this alert."
      type="info"
    />
  </Spin>;

  }
}

let OrderList = Form.create()(EditableTable);

OrderList = withAxios(OrderList)

export default OrderList;










