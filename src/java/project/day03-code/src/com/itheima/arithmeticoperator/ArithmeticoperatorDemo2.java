package com.itheima.arithmeticoperator;

public class ArithmeticoperatorDemo2 {
    public static void main(String[] args){
        byte b1 = 10;
        byte b2 = 20;
        byte result = (byte) (b1 +b2);
        System.out.println(result);

        int a = 10;
        a--;
        System.out.println(a);


        int number = 90;

        if(number > 0 & number < 100){
            System.out.println("OK");
        }
        if(number > 0 && number < 100){
            System.out.println("ok");
        }
    }
}
