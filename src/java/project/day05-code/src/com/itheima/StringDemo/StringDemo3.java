package com.itheima.StringDemo;

import java.util.Scanner;

public class StringDemo3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个手机号");
        String phone = sc.next();
        String number = phoneNumber(phone);
        System.out.println(number);
    };

    public static String phoneNumber(String phone){
        String result = "";
        String start = phone.substring(0,3);
        String end = phone.substring(7);
        result = start;
        for (int i = 0; i < 4; i++) {
            result += "*";
        }
        result += end;
        return result;
    }
}
