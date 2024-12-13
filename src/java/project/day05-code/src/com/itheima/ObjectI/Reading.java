package com.itheima.ObjectI;

public class Reading {
    public static void main(String[] args) {
        Game r1 = new Game("乔峰",100);
        Game r2 = new Game("鸠摩智",100);

        while (true){
            r1.attack(r2);
            if(r2.getXueliang() <= 0){
                System.out.println("乔峰 K.O 鸠摩智");
                break;
            }

            r2.attack(r1);
            if(r1.getXueliang() <= 0){
                System.out.println("鸠摩智 K.O 乔峰");
                break;
            }
        }
    }
}
