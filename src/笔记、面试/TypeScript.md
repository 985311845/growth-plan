## TypeScript环境配置

1. node环境
2. 使用tsc命令对ts文件进行编译，最后编译结果是一个js文件

## TS相比于JS增加了什么

1. 类型
2. 增加了ES不具备的新特性（如抽象类、接口、装饰器、丰富的配置选项）



### 1.TypeScript变量声明

```ts
let num:number;
num = 123;
num = 'hellow'  //此行代码会报错

//如果变量的声明和赋值是同时进行的，TS会自动为变量添加类型;例：
let bool = true;
bool = 123  //这行代码也会报错，ts默认会给已赋值的变量添加初始值测类型
```

```ts
//函数类型声明:参数类型，返回值类型
function(a:number,b:number):number{
  return a+ b;
}
```

<font color="red">*类型表</font>

|  类型   |       例子        |               描述               |
| :-----: | :---------------: | :------------------------------: |
| number  |      1 ，-1       |             任意数字             |
| string  |  'hi' , 'hellow'  |            任意字符串            |
| boolean |    true,false     |              布尔值              |
| 字面量  |      其本身       | 限制了变量的类型就是字面量的类型 |
|   any   |         *         |             任意类型             |
| unknown |         *         |          类型安全的any           |
|  void   | 空值（undefined） |        没有值或undefined         |
|  never  |      没有值       |           不能是任何值           |
| object  | {name: '熏悟空'}  |           任意的js对象           |
|  array  |     [1,2,3,4]     |           任意的js数组           |
|  tuple  |       [4,5]       |  元组，TS新增类型，固定长度数组  |
|  enum   |     enum{A,B}     |        枚举，TS中新增类型        |

