package com.itheima.classObject;

public class phoneTest {
    public static void main(String[] args) {
        phone p = new phone();
        p.brand = "小米";
        p.price = 1999.98;
        p.call();
        p.payGane();
        System.out.println(p.brand);
        System.out.println(p.price);
    }
}
