import java.util.Scanner;

public class ScannerDemo{
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		System.out.println("�������һ������");
		int i1 = sc.nextInt();
		System.out.println("������ڶ�������");
		int i2 = sc.nextInt();
		System.out.println(i1 + i2);
	}
}