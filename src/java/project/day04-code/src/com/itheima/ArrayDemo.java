package com.itheima;

public class ArrayDemo {
    public static void main(String[] args){
//        完整格式
        int[] array = new int[]{1,2,3,4,5,6,7};
//        简化版
        int[] array2 = {1,2,3,4,5,6,7,8};

        String[] name = new String[]{"zhangsan","lisi","wangwu","zhaoliu"};
        String[] name1 = {"zhangsan","lisi","wangwu"};

        System.out.println(name); //打印出来的是数组的地址值 @4554617c
        System.out.println(name1);
    }
}
