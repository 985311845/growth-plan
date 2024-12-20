package com.itheima.StringDemo;

import java.util.Scanner;

public class StringDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入字符串");
        String str = sc.next();

        int bigCount = 0, smallCount = 0, numberCount = 0;

        for (int i = 0; i < str.length(); i++) {
            char s = str.charAt(i);
            if(s >= 'a' && s <= 'z'){
                smallCount++;
            }else if(s >= 'A' && s <= 'Z'){
                bigCount++;
            }else if(s >= '0' && s <= '9'){
                numberCount++;
            }
        };

        System.out.println("大写字母出现了" + bigCount + "次，小写字母出现了" + smallCount + "次，数字出现了" + numberCount + "次");
    }
}
