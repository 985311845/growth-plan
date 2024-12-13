package com.itheima.Goods;

public class Goods {
    private String id;
    private String name;
    private double price;
    private int count;

    public Goods(){};

    public Goods(String id, String name, double price, int count){
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
    }

    public String getId (){
        return this.id;
    }
    public void setId(String id){
        this.id = id;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }

    public double getPrice(){
        return this.price;
    }
    public void setPrice(double price){
        this.price = price;
    }

    public int getCount(){
        return this.count;
    }
    public void setCount(int count){
        this.count = count;
    }
}
