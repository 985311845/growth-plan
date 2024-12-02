import java.util.Scanner;

public class ScannerDemo{
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		System.out.println("请输入第一个整数");
		int i1 = sc.nextInt();
		System.out.println("请输入第二个整数");
		int i2 = sc.nextInt();
		System.out.println(i1 + i2);
	}
}