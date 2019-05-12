import React,{Component} from 'react';
import {
  Table, Input, Select ,Popconfirm, Form,message ,Modal
} from 'antd';
import withAxios from '../hoc/withAxios'
const Option = Select.Option;
const FormItem = Form.Item;
const EditableContext = React.createContext();
const info = (mes) => {
  message.info(mes);
};


const confirm = Modal.confirm;
class EditableCell extends React.Component {
	
  getInput(){
    if (this.props.inputType === 'select') {
      return <Select>
				<Option value="男">男</Option>
				<Option value="女">女</Option>
          </Select>;
    }else if(this.props.inputType === 'select1'){
		 return <Select>
						<Option value="超级管理员">超级管理员</Option>
						<Option value="管理员">管理员</Option>
						<Option value="普通用户">普通用户</Option>
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
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      // required: true,
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
		_data:[],
		editingKey: '',
	 };
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: '20%',
        editable: true,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: '15%',
        editable: true,
      },
	   {
	    title: '手机号码',
	    dataIndex: 'phone',
	    width: '25%',
	    editable: true,
	  },
      {
        title: '身份',
        dataIndex: 'shenfen',
        width: '25%',
        editable: true,
      },
	  {
	    title: '注册时间',
	    dataIndex: 'time',
	    width: '15%',
	    editable: false,
	  },
      {
        title: 'operation',
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
			  <>
                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>Edit</a>&nbsp;
                <a onClick={() => this.handleDelete(record.name)}>detele</a></>
              )}
            </div>
          );
        },
      },
    ];
  }	
	async componentWillMount(){
		let {data}=await this.props.axios.post('/userList/init');
		this.setState({
			_data:data.map((item)=>{
				item.key=item._id
				return item
			})
		})
	}
  isEditing(record){return record.key === this.state.editingKey};

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields(async (error, row) => {
      if (error) {
        return;
      }
      let newData = [...this.state._data];
      let index = newData.findIndex(item => key === item.key);
      if (index > -1) {
		  var istrue=false;
		  console.log(newData)
		  newData.map((item,idx)=>{
				if(item.name==row.name&&index!=idx){
					istrue=true;
					 newData.push(row);
					this.setState({ _data: newData, editingKey: '' });			
				}
			  })
			if(istrue){
				info('已有该用户,请重新输入用户名');
				// alert()
			}else{
				 const item = newData[index];
				newData.splice(index, 1, {
				  ...item,
				  ...row,
				});			
				let upDate=await this.props.axios.post('/userList/upDate',{
					name:item.name,
					newdata:row
				});
				this.setState({ _data: newData, editingKey: '' });
		}
       
      } else {		  
        newData.push(row);
        this.setState({ _data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  handleDelete = (key) => {	 
		var _this=this;
	  confirm({
	   title: 'Do you want to delete these items?',
	   content: 'When clicked the OK button, this dialog will be closed after 1 second',
	   onOk() {
			var dataSource = [..._this.state._data];
			_this.setState({ _data: dataSource.filter(item => item.name !== key) });
			let data= _this.props.axios.get('userList/delete',{
				params:{name:key}
			})
	   },
	   onCancel() {},
	 });
	
   
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
		   inputType: col.dataIndex === 'sex'|| col.dataIndex ==='shenfen' ?(col.dataIndex ==='sex'?'select':'select1'): 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state._data}
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

let EditableFormTable = Form.create()(EditableTable);
EditableFormTable=withAxios(EditableFormTable);

export default EditableFormTable;
