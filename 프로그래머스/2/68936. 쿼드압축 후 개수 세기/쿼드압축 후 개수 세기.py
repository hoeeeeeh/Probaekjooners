answer = [0, 0]

def isEqual(x):
    return len(set(x)) <= 1


def quad_zip(array):
    length = len(array)

    if length <= 2:
        for x in array:
            for j in x:
                answer[j] += 1

    else:
        divided_arr = [[], [], [], []]

        mid = int(length / 2)

        for arr in array[0: mid]:
            divided_arr[0].append(arr[0: mid])
            divided_arr[1].append(arr[mid: length])

        for arr in array[mid: length]:
            divided_arr[2].append(arr[0: mid])
            divided_arr[3].append(arr[mid: length])

        for arrs in divided_arr:
            joined_arr = []
            for arr in arrs:
                joined_arr.extend(arr)

            if isEqual(joined_arr):
                answer[joined_arr[0]] += 1

            else:
                quad_zip(arrs)
                
def solution(arr):
    division = []
    for ar in arr:
        division.extend(ar)
    
    if isEqual(division):
        answer[division[0]] += 1
    else:
        quad_zip(arr)
    return answer