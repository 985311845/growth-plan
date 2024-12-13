package com.itheima.Car;

import java.util.Scanner;

public class InitCar {
    public static void main(String[] args) {
        //数组中的每一项都是Car类型的对象
        Car[] cList = new Car[3];
        //键盘录入
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < cList.length; i++) {
            System.out.println("请输入" + (i + 1) + "辆车子的品牌");
            String pinpai = sc.next();
            System.out.println("请输入" + (i + 1) + "辆车子的价格");
            double price = sc.nextInt();
            System.out.println("请输入" + (i + 1) + "辆车子的颜色");
            String color = sc.next();
            cList[i] = new Car(pinpai, price, color);
        }

        for (int i = 0; i < cList.length; i++) {
            System.out.println("品牌：" + cList[i].getPinpai() + ", 价格" + cList[i].getPrice() + ", 颜色：" + cList[i].getColor());
        }
    }
}
