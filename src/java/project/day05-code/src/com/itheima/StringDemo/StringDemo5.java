package com.itheima.StringDemo;

import java.util.Scanner;
import java.util.StringJoiner;

public class StringDemo5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str;
        while (true){
            System.out.println("请输入一个字符串");
            str = sc.next();
            boolean flag = checkStr(str);
            if(flag){
                break;
            }else{
                System.out.println("当前的字符串不符合规则，请重新输入");
                continue;
            }
        };

        StringBuilder sb = new StringBuilder();
        StringJoiner sj = new StringJoiner("----","","");
        for (int i = 0; i < str.length(); i++) {
            sb.append(changeLuoM(str.charAt(i) - 48));
            sj.add(changeLuoM(str.charAt(i) - 48));
        }
        String newStr = sb.toString();
        String newStr1 = sj.toString();
        System.out.println(newStr);
        System.out.println(newStr1);
    }
    private static String changeLuoM(int number){
        String[] arr = new String[]{"","Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ"};
        return arr[number];
    }
    private static boolean checkStr(String str){
        int len = str.length();
        if(len > 9){
            return false;
        }

        for (int i = 0; i < len; i++) {
            char s = str.charAt(i);
            if(s < '0' || s > '9'){
                return false;
            }
        }

        return true;
    }
}
