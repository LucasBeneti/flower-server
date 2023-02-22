# Flower server

## Features

-   gerenciar dados ambientais do dispositivo (de uma determinada estufa)
-   gerenciar login do usuário
-   gerenciar configurações das estufas do usuário
-   gerenciar configurações do usuário do setup do dispositivo
-   gerenciar qual dispositivo (identificado pelo número de série) é de qual
    usuário
-   retornar valores de VPD e outros elementos (dew point é algo interessante,
    serão calculados através de fórmulas)

## O que receberá?

-   Dados do dispositivo como:
    -   temperatura, umidade, luminosidade e dióxido de carbono

## O que deverá ser calculado/retornado

-   todos os pontos das medições para um período (dar um jeito de salvar isso local)
-   valores de dew point, VPD (calculado por fórmula, levando em consideração
    temperatura, umidade e umas outras constantes)

## TODO

### User

[ ] create the relationship between a user and its devices

[ ] user rooms configurations (what rooms has which device)

[ ] ? user targets and thresholds
