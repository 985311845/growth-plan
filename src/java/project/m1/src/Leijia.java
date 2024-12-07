public class Leijia {
    public static void main(String[] args){
//        int result = 0;
//        for(int i = 1; i <= 5; i++){
//            result += i;
//        };
//        System.out.println("从1到5的累加和为：" + result);
//
//
//        int result2 = 0;
//        for(int i = 1; i <= 100; i++){
//            if(i % 2 == 0){
//                result2 += i;
//            }
//        }
//        System.out.println("从1到100d的偶数和为：" + result2);

//        int result3 = 0;
//        Scanner sc = new Scanner(System.in);
//        System.out.println("请输入第一个整数");
//        int a = sc.nextInt();
//        System.out.println("请输入第二个整数");
//        int b = sc.nextInt();
//        boolean flag = a > b ? true : false;
//        if(flag){
//            for(int i = b; i <= a; i++){
//                if(i % 3 == 0 && i % 5 ==0){
//                    result3 += i;
//                }
//            }
//        }else{
//            for(int i = a; i <= b; i++){
//                if(i % 3 == 0 && i % 5 ==0){
//                    result3 += i;
//                }
//            }
//        }
//        System.out.println("从" + b + "到" + a + "之间能内3和5整除的数的和为：" + result3);

//        int x = 213;
//        int y = x;
//        int num = 0;
//        while (x != 0){
//            //个位数
//            int ge = x % 10;
//            x = x / 10;
//            num = num * 10 + ge;
//        };
//        if(num == y){
//            System.out.println("是回文数");
//        }

        int a = 24;
        int b = 379;
        int i = 0;
        while (b >= a){
            i++;
            b -= a;
        };
        System.out.println(i);
    }
}
