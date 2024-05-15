import random, time

def randBinary(length):
    result = 1
    for i in range(length-1):
        result = result * 10 + random.randint(0,1)
    return result

while True:
    try:
        last = time.perf_counter()
        rand = str(randBinary(5))
        user = input(f'Welche Dezimalzahl entspricht dieser Binärzahl?   {rand} \n')
        if int(user) == int(rand, 2):
            print(f'Du hast es in {round(time.perf_counter() - last, 2)} Sekunden :)')
            break
        else:
            print(f'{user} ist leider die falsche Zahl. Du darfst es nochmal mit einer anderen probieren :)')
    except KeyboardInterrupt:
        print('Schade, dass du nicht mehr spielen willst :(')
        break