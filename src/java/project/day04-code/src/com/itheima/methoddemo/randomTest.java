package com.itheima.methoddemo;

public class randomTest {
    public static void main(String[] args) {
        char[] chs = new char[52];
        for(int i = 0; i < chs.length; i++){
            if(i <= 25){
                chs[i] = (char)(97 + i);
            }else{
                chs[i] = (char)(65 + i -26);
            }
        }
        for(int i = 0; i < chs.length; i++){
            System.out.println(chs[i]);
        }
    }
}
