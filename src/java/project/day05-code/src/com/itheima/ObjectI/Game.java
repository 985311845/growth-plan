package com.itheima.ObjectI;

import java.util.Random;

public class Game {
    private String name;
    private int xueliang;

    public Game(){};

    public Game(String name, int xueliang){
        this.name = name;
        this.xueliang = xueliang;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }
     public int getXueliang(){
        return this.xueliang;
     }
     public void setXueliang(int xueliang){
        this.xueliang = xueliang;
     }

     public void attack(Game test){
        //随机数产生伤寒
         Random r = new Random();

         int hurt = r.nextInt(20) + 1;

         //计算剩余血量
         int remain =  test.getXueliang() - hurt;
         //如果血量等于0或者小于0，就重置为0
         remain = remain <= 0 ? 0 : remain;

         test.setXueliang(remain);

         System.out.println(this.name + "举起拳头打了一下" + test.getName() + "产生了" + hurt + "点伤害，剩余"+ test.getXueliang() + "点血量");
     }
}
