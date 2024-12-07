package com.itheima;

public class ArrayDemo2 {
    public static void main(String[] args){
        int[] arr = new int[]{1,2,3,4,5,6,7,8,9};
        int count = 0;
        for (int i = 0; i < arr.length; i++) {
            count+=arr[i];
        }
        System.out.println(count);

        int[] arr1 = new int[]{1,2,3,4,5,6,7,8,9,10};

        for (int i = 0; i < arr1.length; i++) {
            if(arr1[i] % 2 == 0){
                arr1[i] = arr1[i] / 2;
            }else{
                arr1[i] = arr1[i] * 2;
            }
        }
    }
}
