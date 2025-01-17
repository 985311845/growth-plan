package com.itheima.StringDemo;

import java.util.Scanner;

public class StringDemo7 {
    public static void main(String[] args) {
        String[] arr = userScanner();
        String num1 = arr[0];
        String num2 = arr[1];
        while (true){
            boolean flag = check(num1) && check(num2);
            if(flag){
                int result = computed(num1, num2);
                System.out.println(result);
                break;
            }else{
                System.out.println("请输入合法的数字字符串");
                arr = userScanner();
                num1 = arr[0];
                num2 = arr[1];
            }
        }
    }

    private static String[] userScanner(){
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入第一个数字字符串");
        String num1 = sc.next();
        System.out.println("请输入第二个数字字符串");
        String num2 = sc.next();

        return new String[]{num1, num2};
    }
    private static boolean check(String str){
        for (int i = 0; i < str.length(); i++) {
            if(str.charAt(i) < '0' || str.charAt(i) > '9'){
                return false;
            }
        }
        return true;
    }
    private static int computed(String num1, String num2){
        return toNumber(num1) * toNumber(num2);
    }
    private static int toNumber(String num){
        int result = 0;
        for (int i = 0; i < num.length(); i++) {
            result = (result * 10) + (num.charAt(i) - 48);
        }
        return result;
    }
}
