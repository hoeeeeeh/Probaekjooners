n = int(input())

if n == 1:
    print('SK')
else:
    if n % 7 == 0 or n % 7 == 2:
        print('CY')
    else:
        print('SK')

exit(0)
