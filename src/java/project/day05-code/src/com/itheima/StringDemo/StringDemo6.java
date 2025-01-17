package com.itheima.StringDemo;

import java.util.Scanner;

public class StringDemo6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("请输入第一个字符串");

        String str1 = sc.next();

        System.out.println("请输入第二个字符串");

        String str2 = sc.next();

        boolean flag = false;
        for (int i = 0; i < str1.length(); i++) {

            str1 = swap(str1);

            flag = comparison(str1,str2);

            if(flag){
                flag = true;
                break;
            }else{
                continue;
            }
        }

        System.out.println(flag);
    }
    //用subString来截取字符串，从而反转数组
    private static String swap(String str){
        String result;
        String start = str.substring(0,1);
        String end = str.substring(1);
        StringBuilder sb = new StringBuilder();
        result = sb.append(end).append(start).toString();
        return result;
    }

    //用数组反转字符串
    private static String swap2(String str){
        char[] arr = str.toCharArray();
        char first = str.charAt(0);
        for (int i = 1; i < str.length(); i++) {
            arr[i - 1] = arr[i];
        }
        arr[arr.length - 1] = first;

        return new String(arr);
    }

    private static boolean comparison(String str1, String str2){

        if(str1.equals(str2)){
            return true;
        }else{
            return false;
        }
    }

}
