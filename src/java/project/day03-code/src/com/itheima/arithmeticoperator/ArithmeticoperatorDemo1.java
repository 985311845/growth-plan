package com.itheima.arithmeticoperator;

import java.util.Scanner;

public class ArithmeticoperatorDemo1 {
    public static void main(String[] args){
//        System.out.println(3 + 2);
//        System.out.println(5 - 1);
//        System.out.println(5 * 5);
//        System.out.println(5 / 5);
//        System.out.println(5 % 5);

        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个三位数");
        int number = sc.nextInt();
        int g = number % 10;//个位数
        int s = (number / 10) % 10;//十位数
        int b = number / 100;//百位数
        System.out.println(g);
        System.out.println(s);
        System.out.println(b);
    }
}
