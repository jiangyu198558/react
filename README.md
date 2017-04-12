# react demo
一、React简介
React是一个Facebook和Instagram用来创建用户界面的JavaScript库，是MVC中的V（视图）。为了解决一个问题：构建随着时间数据不断变化的大规模应用程序。React拥有较高的性能，代码逻辑非常简单。

特点：
声明式设计
高效
灵活
JSX
组件
单向响应的数据流

二、开发环境设置
1、using a cdn
<script src="https://unpkg.com/react@latest/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@latest/dist/react-dom.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>

实例中引入了三个库：react.js、react-dom.js、babel.min.js
react.js -- React的核心库
react-dom.js 提供与DOM相关的功能
babel.min.js --Babel可以将ES6代码转为ES5代码，在不支持ES6浏览器上执行React代码Babel内嵌了对JSX的支持。

2、通过npm使用React + webpack
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm config set registry https://registry.npm.taobao.org
cnpm install [name]
