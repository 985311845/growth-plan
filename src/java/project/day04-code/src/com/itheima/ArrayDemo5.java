package com.itheima;

import java.util.Random;

public class ArrayDemo5 {
    public static void main(String[] args) {
        //数据和
        int count = 0;
        //平均数
        double avg = 0;
        //比平均数小的个数
        int num = 0;
        //创建随机数类
        Random r = new Random();
        //初始化数组
        int[] arr = new int[10];
        //生成10个随机数存入数组
        for (int i = 0; i < 10; i++) {
            arr[i] = r.nextInt(100) + 1;
        };
        for (int i = 0; i < arr.length; i++) {
            count += arr[i];
        }
        avg = count / arr.length;

        for (int i = 0; i < arr.length; i++) {
            if(arr[i] < avg){
                num++;
            }
        }
        System.out.println(count);
        System.out.println(avg);
        System.out.println(num);
    }
}
