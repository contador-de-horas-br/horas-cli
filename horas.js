#!/usr/bin/env node
// horas-cli — somar, subtrair e converter durações (HH:MM[:SS]) sem dependências.
// Autor: Verse Media — Licença MIT
'use strict';

function paraSegundos(texto) {
  const neg = texto.startsWith('-');
  const partes = texto.replace(/^-/, '').split(':').map(Number);
  while (partes.length < 3) partes.push(0);
  const [h, m, s] = partes;
  if ([h, m, s].some(Number.isNaN) || m > 59 || s > 59) throw new Error(`Valor inválido: ${texto}`);
  const t = h * 3600 + m * 60 + s;
  return neg ? -t : t;
}

function formatar(seg) {
  const sinal = seg < 0 ? '-' : '';
  let t = Math.abs(seg);
  const h = Math.floor(t / 3600); t %= 3600;
  const dd = (n) => String(n).padStart(2, '0');
  return `${sinal}${dd(h)}:${dd(Math.floor(t / 60))}:${dd(t % 60)}`;
}

function somar(lista) { return lista.reduce((a, t) => a + paraSegundos(t), 0); }

function diferenca(inicio, fim) {
  let d = paraSegundos(fim) - paraSegundos(inicio);
  if (d < 0) d += 86400; // virou a meia-noite
  return d;
}

function emDias(seg) {
  const dias = Math.floor(seg / 86400);
  return `${dias} dia(s) e ${formatar(seg - dias * 86400)}`;
}

const decimal = (seg) => +(seg / 3600).toFixed(2);

module.exports = { paraSegundos, formatar, somar, diferenca, emDias, decimal };

if (require.main === module) {
  const [cmd, ...args] = process.argv.slice(2);
  try {
    switch (cmd) {
      case 'somar':   console.log(formatar(somar(args))); break;
      case 'dif':     console.log(formatar(diferenca(args[0], args[1]))); break;
      case 'dias':    console.log(emDias(paraSegundos(args[0]))); break;
      case 'decimal': console.log(decimal(paraSegundos(args[0]))); break;
      default:
        console.log('uso: horas.js somar 07:45 01:30 | dif 22:10 05:40 | dias 72:00 | decimal 07:45');
        process.exitCode = cmd ? 1 : 0;
    }
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
