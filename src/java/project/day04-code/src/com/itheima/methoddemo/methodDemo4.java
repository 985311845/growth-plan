package com.itheima.methoddemo;

import java.util.Scanner;

public class methodDemo4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入机票原价");
        double p = sc.nextDouble();
        System.out.println("请输入月份");
        int m = sc.nextInt();
        System.out.println("请输入头等舱或经济舱");
        String t = sc.next();
        double result = price(p, m, t);
        System.out.println(result);
    }
    public static double price(double p,int m,String t){
        if(t == "头等舱"){
            switch (m){
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                    return (p * 0.9);
                default:
                    return (p * 0.85);
            }
        }else{
            switch (m){
                case 1:
                case 2:
                case 3:
                case 4:
                case 11:
                case 12:
                    return (p * 0.7);
                default:
                    return (p * 0.65);
            }
        }
    }
}
