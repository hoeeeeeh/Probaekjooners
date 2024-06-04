import sys

read = sys.stdin.readline

number = int(read())

if number < 2:
    print('A')

elif number == 2:
    a,b = list(map(int, read().split()))
    if a == b:
        print(a)
    else:
        print('A')

else:
    nums = list(map(int, read().split()))

    first_num = nums.pop(0)
    second_num = nums.pop(0)

    if first_num == second_num:
        while nums:
            if first_num != nums.pop():
                print('B')
                exit(0)

        print(first_num)

    else:
        third_num = nums.pop(0)

        first_diff = second_num - first_num
        second_diff = third_num - second_num

        multiply = second_diff / first_diff

        prev = third_num
        diff = second_diff * multiply

        cnt = 2

        if int(multiply) != multiply:
            print('B')
            exit(0)

        while nums:
            test = nums.pop(0)

            if prev + first_diff * (multiply ** cnt) != test:
                print('B')
                exit(0)

            cnt += 1
            prev = test

        print(int(prev + first_diff * (multiply ** cnt)))




