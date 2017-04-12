import React from 'react';
import FormItem from '../components/FormItem';
import HomeLayout from '../layouts/HomeLayout';
import formProvider from '../utils/formProvider';

class UserAdd extends React.Component {
	constructor(){
		super();
		this.state = {
			form: {
				name: {
					valid: false,
					value: '',
					error: ''
				},
				age: {
					valid: false,
					value: 0,
					error: ''
				},
				gender: {
					valid: false,
					value: '',
					error: ''
				}
			}
		};
	}
	handleValueChange(field, value, type='string'){
		if(type==='number'){
			value += value;
		}
		const {form} = this.state;
		const newFieldObj = {value, valid: true, error: ''};

		switch(field){
			case "name": {
				if(value.length >= 5){
					newFieldObj.error = "用户名最多4个字符";
					newFieldObj.valid = false;
				}else if(value.length === 0){
					newFieldObj.error = '请输入用户名';
					newFieldObj.valid = false;
				}
				break;
			}
			case "age": {
				if(value > 100 || value <= 0){
					newFieldObj.error = "请输入1-100之间的数字";
					newFieldObj.valid = false;
				}
				break;
			}
			case "gender": {
				if(!value){
					newFieldObj.error = "请选择性别";
					newFieldObj.valid = false;
				}
				break;
				break;
			}
			default:
				break;
		}
		this.setState({
			form: {
				...form,
				[field]: newFieldObj
			}
		});
	}
	handleSubmit(e){
		// 阻止表单submit事件自动跳转页面的动作
		e.preventDefault();
		//alert(JSON.stringify(this.state));
		const {form: {name, age, gender}, formValid} = this.props;
		if(!formValid){
			alert('请填写正确的信息后重试');
			return ;
		}
		fetch('http://localhost:3000/user', {
			method: 'post',
			body: JSON.stringify({
				name: name.value,
				age: age.value,
				gender: gender.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res)=>res.json())
		.then((res)=>{
			if(res.id){
				alert('添加用户成功');
				this.context.router.push('/user/list');
				// this.setState({
				// 	name: '',
				// 	age: 0,
				// 	gender: ''
				// });
			}else{
				alert('添加失败');
			}
		}).catch((err)=>console.error(err));
	}
	render(){
		const {form: {name, age, gender}, onFormChange} = this.props;
		return (
			<HomeLayout title="添加用户">
				<form onSubmit={(e)=>this.handleSubmit(e)}>
					<FormItem label="用户名：" valid={name.valid} error={name.error}>
						<input type="text" value={name.value} onChange={(e)=>this.handleValueChange('name', e.target.value)}/>
					</FormItem>
					<FormItem label="年龄：" valid={age.valid} error={age.error}>
						<input type="number" value={age.value || ''} onChange={(e)=>this.handleValueChange('age', e.target.value, 'number')}/>
					</FormItem>
					<FormItem label="性别：" value={gender.valid} error={gender.error}>
						<select value={gender.value} onChange={(e)=>this.handleValueChange('gender', e.target.value)}>
							<option value="">请选择</option>
							<option value="male">男</option>
							<option value="female">女</option>
						</select>
					</FormItem>
					<br />
					<input type="submit" value="提交"/>
				</form>
			</HomeLayout>
		);
	}
}

UserAdd.contextTypes = {
	router: React.PropTypes.object.isRequired
};

UserAdd = formProvider({
	name: {
		defaultValue: '',
		rules: [
		{
			pattern: function(value){
				return value.length > 0;
			},
			error: '请输入用户名'
		},{
			pattern: /^.{1,4}$/,
			error: '用户名最多4个字符'
		}]
	},
	age: {
		defaultValue: 0,
		rules: [
		{
			pattern: function(value){
				return value >= 1 && value <= 100;
			},
			error: '请输入1~100的年龄'
		}]
	},
	gender: {
		defaultValue: '',
		rules: [
			{
				pattern: function(value){
					return !!value;
				},
				error: '请选择性别'
			}
		]
	}
})(UserAdd);

export default UserAdd;