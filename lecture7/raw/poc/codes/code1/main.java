import java.util.Scanner;

public class Main{
    public static void main(String[] args){
        Scanner scn = new Scanner(System.in);
        int n = scn.nextInt();
        int f = fact(n);
        System.out.println(f);
    }
    public static int fact(int n){
        //if 0! to find 0!=1.
        if(n==0){
            return 1;
        }
        int factFromFn = fact(n-1);
        int fact = factFromFn*n;
        return fact;
    }
}