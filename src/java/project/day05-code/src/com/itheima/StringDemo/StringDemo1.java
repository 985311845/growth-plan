package com.itheima.StringDemo;

import java.util.Scanner;

public class StringDemo1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个字符串");
        String str = sc.next();
        String result = reverce(str);
        System.out.println(result);
    }
    public static String reverce(String string){
        String result = "";
        for (int i = string.length() - 1; i >= 0; i--) {
            result += string.charAt(i);
        };
        return result;
    }
}
