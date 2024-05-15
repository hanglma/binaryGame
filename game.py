import pygame
import random,time,json

pygame.init()

screen = pygame.display.set_mode((800,600), pygame.RESIZABLE)

font_number = pygame.font.Font('ethnocentricrgit.otf', 80)

bg_img = pygame.image.load('background.png')
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
PURPLE = (255, 0, 255)

def draw_text (text, font, text_col, x, y):
    img = font.render(text, True, text_col)
    text_rect = img.get_rect(center=(SCREEN_WIDTH/x, SCREEN_HEIGHT/y))
    screen.blit(img, text_rect)

def randBinary(length):
    result = 1
    for i in range(length-1):
        result = result * 10 + random.randint(0,1)
    return result

user_input = ''

run = True
state = 'start'
while run:

    screen.fill((255,255,255))
    screen.blit(bg_img, bg_img.get_rect(center = screen.get_rect().center))
    SCREEN_WIDTH, SCREEN_HEIGHT  = screen.get_size()
    
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_BACKSPACE:
                user_input = user_input[:-1]
            elif event.key in [pygame.K_0, pygame.K_1, pygame.K_2, pygame.K_3, pygame.K_4, pygame.K_5, pygame.K_6, pygame.K_7, pygame.K_8, pygame.K_9]:
                if len(user_input) <= 2:
                    user_input += event.unicode
            elif event.key == pygame.K_RETURN:
                try:
                    match state:
                        case 'game':
                            if int(user_input) == int(rand,2):
                                score = round(time.perf_counter() - last, 2)
                                state = 'right'
                            else: 
                                state = 'wrong'
                        case 'right' | 'wrong':
                            state = 'start'
                except ValueError:
                    user_input = user_input[:-1]
                        
    match state:
        case 'start':
            rand = str(randBinary(6))
            user_input = ''
            last = time.perf_counter()
            state = 'game'
        case 'game':
            draw_text(rand, font_number, WHITE, 2, 3)
            draw_text(user_input, font_number, WHITE, 2, 2)
        case 'right':
            draw_text(f'RICHTIG :) {score}s', font_number, GREEN, 2, 3)
        case 'wrong':
            draw_text('LEIDER FALSCH :(', font_number, RED, 2, 3)

    pygame.display.flip()

pygame.quit()