package com.itheima;

public class ArrayDemo4 {
    public static void main(String[] args) {
        int[] arr = new int[]{33,5,22,44,55};
        int max = arr[0];
        for (int i = 0; i < arr.length - 1; i++) {
            if(arr[i] >= max){
                max = arr[i];
            }
        }
        System.out.println(max);
    }
}
