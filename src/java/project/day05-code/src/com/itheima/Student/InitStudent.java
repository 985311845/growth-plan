package com.itheima.Student;

import java.util.Scanner;

public class InitStudent {
    public static void main(String[] args) {
        Student[] student = new Student[3];

        Student s1 = new Student("001", "张三", 20);
        Student s2 = new Student("002", "李四", 18);

        student[0] = s1;
        student[1] = s2;

        addStudent(student);
    }
    public static void addStudent(Student[] student){
        Student s = scStudent();
        //数组长度
        int length = 0;
        //数组中是否存在的flag
        boolean isClude = false;
        //数组中元素的个数
        for (int i = 0; i < student.length; i++) {
            if(student[i] != null){
                length++;
            }
        }
        //查询数组中是否存在相同id的学生
        for (int i = 0; i < length; i++) {
            if(s.getId().equals(student[i].getId())){
                isClude = true;
                break;
            }
        }
        //如果存在的话，提示添加失败，并让用户重新输入
        if(isClude){
            System.out.println("该学号已存在，请重新输入");
            addStudent(student);
        }else{
            //数组中已经存在3条数据
            if(length == 3){
                //把最后一项替换成刚刚输入的学生信息
                student[2] = s;
            }else{
                student[length] = s;
            }
            for (int i = 0; i < student.length; i++) {
                System.out.println("id:" + student[i].getId() + ", 姓名：" + student[i].getName() + ", 年龄：" + student[i].getAge());
            }
        }
    }

    public static Student scStudent(){
        //键盘录入学生信息
        Scanner sc = new Scanner(System.in);
        //录入学生id
        System.out.println("请输入学生id");
        String id = sc.next();
        //录入学生姓名
        System.out.println("请输入学生姓名");
        String name = sc.next();
        //录入学生年龄
        System.out.println("请输入学生年龄");
        int age = sc.nextInt();
        //实例化学生对象
        Student s = new Student(id, name, age);

        return s;
    }
}
