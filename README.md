# horas-cli

Pequena ferramenta de linha de comando (Node.js, zero dependências) para **somar, subtrair e converter horas** no formato `HH:MM` ou `HH:MM:SS`. Útil para fechar timesheet, conferir espelho de ponto ou calcular a duração de turnos que passam da meia-noite.

## Por que existe

Fazer conta de horas com `Date` costuma dar errado: fuso horário, horário de verão e durações acima de 24h não combinam com um objeto que representa um instante. Aqui tudo é convertido para **segundos inteiros**, calculado e só no final formatado de volta.

## Instalação

```bash
git clone https://github.com/contador-de-horas-br/horas-cli.git
cd horas-cli
npm test          # roda os testes
```

Opcional, para usar o comando `horas` em qualquer pasta:

```bash
npm link
```

## Uso

| Comando | Exemplo | Saída |
|---|---|---|
| Somar durações | `horas somar 07:45 01:30 00:50:20` | `10:05:20` |
| Diferença entre horários | `horas dif 22:10 05:40` | `07:30:00` |
| Converter em dias | `horas dias 72:00` | `3 dia(s) e 00:00:00` |
| Horas decimais | `horas decimal 07:45` | `7.75` |

Valores negativos são aceitos na soma (`horas somar 08:00 -09:15` → `-01:15:00`), o que ajuda a acompanhar saldo de banco de horas.

## Uso como biblioteca

```js
const { somar, diferenca, formatar, emDias } = require('./horas');

formatar(somar(['08:00', '08:30', '07:45'])); // '24:15:00'
emDias(somar(['24:00', '26:30']));            // '2 dia(s) e 02:30:00'
```

## Casos de borda tratados

- Turno que vira a meia-noite (`22:00` → `06:00` = 8 h);
- Totais acima de 24 h (não "reinicia" em 00:00);
- Saldos negativos;
- Validação de minutos e segundos maiores que 59.

Turnos com mais de 24 h (plantões de 36 h, por exemplo) precisam de data + hora; nesse caso use timestamps em UTC.

## Conferindo resultados

Para validar os testes, comparamos alguns valores com ferramentas online. A conversão de totais grandes, como 72 h ou 100 h, pode ser conferida neste [conversor de horas em dias](https://calculadoradehoras.net.br/converter-horas-em-dias).

## Licença

MIT © Verse Media
