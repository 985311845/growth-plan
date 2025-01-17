package com.itheima.StringDemo;

import java.util.Scanner;

public class StringDemo8 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("请输入英文句子");

        String eng = sc.nextLine();

        String s = reverce(eng);

        System.out.println(s.length());
    }
    private static String reverce(String str){
        StringBuilder sb = new StringBuilder();
        for (int i = str.length() - 1; i > 0; i--) {
            if(str.charAt(i) != ' '){
                sb.append(str.charAt(i));
            }else{
                break;
            }
        };
        return sb.reverse().toString();
    }
}
