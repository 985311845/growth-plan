package com.itheima.Question;

import java.util.Scanner;

public class Test1 {
    public static void main(String[] args) {
        Student[] students = new Student[3];

        students[0] = new Student("001", "张三", 17);

        comparison(students);
    }

    public static void comparison(Student[] students){
        //直接初始化
        Student s1 = new Student("001", "李四", 19);
        System.out.println((students[0].getId() == s1.getId()) + "=======1"); //true
        //键盘录入
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入ID");
        String id = sc.next();
        System.out.println("请输入姓名");
        String name = sc.next();
        System.out.println("请输入年龄");
        int age = sc.nextInt();

        Student s2 = new Student(id, name, age);

        System.out.println((students[0].getId() == s2.getId()) + "=======2"); //false

        students[1] = new Student(id, name, age);

        System.out.println((students[0].getId() == students[1].getId()) + "=======3"); //false

        //初始化之后加到数组里面去
        students[2] = new Student("001", "赵六", 21);
        System.out.println((students[0].getId() == students[2].getId()) + "=======4");  //true
    }
}
