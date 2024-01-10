import { Prisma, $Enums } from '@prisma/client';

// productTypeId 1 Micro
// 2 String
// 3 Hybrid
// export const testTypes: Prisma.TestTypeCreateManyInput[] = [
  export const testTypes: any[] = [ 
  // MICROS
  // obrigatorios

  // CODE: 10101
  {
    productTypeId: 1,
    description: `Nota fiscal de compra.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 10102
  {
    productTypeId: 1,
    description: `Diagrama unifilar.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 10103
  {
    productTypeId: 1,
    description: `Datasheet dos módulos.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 10104
  {
    productTypeId: 1,
    description: `Foto da etiqueta com o número de série (SN) do Microinversor.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 10105
  {
    productTypeId: 1,
    description: `Vídeo amplo do local da instalação.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 10106
  {
    productTypeId: 1,
    description: `Foto da stringbox CA aberta.`,
    name: `Obrigatório`,
    isOptional: false,
  },

  // opicionais

  // erro: nao liga
  // CODE: 10201
  {
    productTypeId: 1,
    description: `Enviar vídeo dos leds do micro com os módulos conectados.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 10202
  {
    productTypeId: 1,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s dos módulos, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 10203
  {
    productTypeId: 1,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 10204
  {
    productTypeId: 1,
    description: `Verificar se houve inversão de TERRA e NEUTRO.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 10205
  {
    productTypeId: 1,
    description: `Enviar vídeo testando continuidade em todas as entradas CC do Microinversor.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },

  // erro: no pv
  // CODE: 10301
  {
    productTypeId: 1,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s dos módulos, mostrando bem
    as ponteiras e visor do multímetro.`,
    name: `PV sem geração`,
    isOptional: true,
    fault: [
      $Enums.Faults.DOESNT_GENERATES,
      $Enums.Faults.PV1,
      $Enums.Faults.PV2,
      $Enums.Faults.PV3,
      $Enums.Faults.PV4,
      $Enums.Faults.PV_IN_SHORT_CIRCUIT,
    ],
  },
  // CODE: 10302
  {
    productTypeId: 1,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `PV sem geração`,
    isOptional: true,
    fault: [
      $Enums.Faults.DOESNT_GENERATES,
      $Enums.Faults.PV1,
      $Enums.Faults.PV2,
      $Enums.Faults.PV3,
      $Enums.Faults.PV4,
      $Enums.Faults.PV_IN_SHORT_CIRCUIT,
    ],
  },
  // CODE: 10303
  {
    productTypeId: 1,
    description: `Enviar vídeo testando continuidade em todas as entradas CC do Microinversor.`,
    name: `PV sem geração`,
    isOptional: true,
    fault: [
      $Enums.Faults.DOESNT_GENERATES,
      $Enums.Faults.PV1,
      $Enums.Faults.PV2,
      $Enums.Faults.PV3,
      $Enums.Faults.PV4,
      $Enums.Faults.PV_IN_SHORT_CIRCUIT,
    ],
  },

  // erro: nao emite ap
  // CODE: 10401
  {
    productTypeId: 1,
    description: `Desligar/ Desconectar os módulos por 10 minutos e religar.`,
    name: `Não emite rede AP`,
    isOptional: true,
    fault: [$Enums.Faults.COMMUNICATION],
  },
  // CODE: 10402
  {
    productTypeId: 1,
    description: `Enviar vídeo dos leds do micro com os módulos conectados.`,
    name: `Não emite rede AP`,
    isOptional: true,
    fault: [$Enums.Faults.COMMUNICATION],
  },
  // CODE: 10403
  {
    productTypeId: 1,
    description: `Enviar foto da tela do celular na área de Wifi.`,
    name: `Não emite rede AP`,
    isOptional: true,
    fault: [$Enums.Faults.COMMUNICATION],
  },
  // CODE: 10404
  {
    productTypeId: 1,
    description: `Inverter a antena de conexão Wifi com a de outro microinversor normalizado.`,
    name: `Não emite rede AP`,
    isOptional: true,
    fault: [$Enums.Faults.COMMUNICATION],
  },

  // erro: micro nao identifica CA
  // CODE: 10501
  {
    productTypeId: 1,
    description: `Enviar vídeo dos leds do micro com os módulos conectados.`,
    name: `Micro não identifica CA`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_RECOGNIZE_AC],
  },
  // CODE: 10502
  {
    productTypeId: 1,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Micro não identifica CA`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_RECOGNIZE_AC],
  },
  // CODE: 10503
  {
    productTypeId: 1,
    description: `Verificar se houve inversão de TERRA e NEUTRO.`,
    name: `Micro não identifica CA`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_RECOGNIZE_AC],
  },
  // CODE: 10504
  {
    productTypeId: 1,
    description: `Enviar vídeo testando continuidade em ambas entradas CA do Microinversor.`,
    name: `Micro não identifica CA`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_RECOGNIZE_AC],
  },

  // MICRO NAO CONECTA WIFI
  // CODE: 10601
  {
    productTypeId: 1,
    description: `Conectar-se à rede AP_ do microinversor com a senha 12345678, e no navegador nas configurações da página 10.10.100.254, enviar um PRINT da aba STATUS, com os ícones DEVICE INFORMATION e REMOTE SERVER INFORMATION expandidos.`,
    name: `Micro não conecta WIFI`,
    isOptional: true,
    fault: [$Enums.Faults.OTHERS, $Enums.Faults.COMMUNICATION],
  },

  // STRINGS
  // Obrigatorios
  // CODE: 20101
  {
    productTypeId: 2,
    description: `Nota fiscal de compra.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20102
  {
    productTypeId: 2,
    description: `Diagrama unifilar.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20103
  {
    productTypeId: 2,
    description: `Datasheet dos módulos.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20104
  {
    productTypeId: 2,
    description: `Foto da etiqueta lateral completa.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20105
  {
    productTypeId: 2,
    description: `Vídeo amplo do local da instalação.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20106
  {
    productTypeId: 2,
    description: `Vídeo amplo do local da instalação dos módulos.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20107
  {
    productTypeId: 2,
    description: `Foto da stringbox CA aberta.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20108
  {
    productTypeId: 2,
    description: `Foto da stringbox CC (Se possuir)`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 20109
  {
    productTypeId: 2,
    description: `Datasheet do transformador (Se possuir).`,
    name: `Obrigatório`,
    isOptional: false,
  },

  // erro: Nao liga
  // CODE: 20201
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 20202
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 20203
  {
    productTypeId: 2,
    description: `Enviar foto da parte inferior do inversor mostrando as MPPTs.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 20204
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra (carcaçado inversor) e negativo + terra (carcaça do inversor), até estabilizar a tensão no multímetro.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },
  // CODE: 20205
  {
    productTypeId: 2,
    description: `Enviar vídeo testando continuidade nas entradas CC do inversor com a chave seccionadora em posição ON.`,
    name: `Não liga`,
    isOptional: true,
    fault: [$Enums.Faults.DOESNT_TURN_ON],
  },

  // erro: sem comunicação
  // CODE: 20301
  {
    productTypeId: 2,
    description: `Enviar vídeo mostrando os leds do datalogger.`,
    name: `Inversor sem comunicação`,
    isOptional: true,
    fault: [$Enums.Faults.COMMUNICATION],
  },
  // CODE: 20302

  {
    productTypeId: 2,
    description: `Enviar foto dos parâmetros de comunicação.`,
    name: `Inversor sem comunicação`,
    isOptional: true,
    fault: [$Enums.Faults.COMMUNICATION],
  },

  // erro: danos fisicos
  // CODE: 20401
  {
    productTypeId: 2,
    description: `Enviar foto do dano.`,
    name: `Danos físicos`,
    isOptional: true,
    fault: [$Enums.Faults.PHISICAL_DAMAGE],
  },

  // F 14
  // CODE: 20501
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Erro F14`,
    isOptional: true,
    fault: [$Enums.Faults.F14],
  },
    // CODE: 20502
  {
    productTypeId: 2,
    description: `Enviar foto da parte inferior do inversor mostrando as MPPTs.`,
    name: `Erro F14`,
    isOptional: true,
    fault: [$Enums.Faults.F14],
  },
    // CODE: 20503
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra (carcaçado inversor) e negativo + terra (carcaça do inversor), até estabilizar a tensão no multímetro.`,
    name: `Erro F14`,
    isOptional: true,
    fault: [$Enums.Faults.F14],
  },
    // CODE: 20504
  {
    productTypeId: 2,
    description: `Enviar vídeo testando continuidade nas entradas CC do inversor com a chave seccionadora em posição ON.`,
    name: `Erro F14`,
    isOptional: true,
    fault: [$Enums.Faults.F14],
  },

  // f 19
    // CODE: 20601
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Erro F19`,
    isOptional: true,
    fault: [$Enums.Faults.F19],
  },
  // CODE: 20602
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Erro F19`,
    isOptional: true,
    fault: [$Enums.Faults.F19],
  },

  // erro f23/f24
  // CODE: 20701
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Erro F23/f24`,
    isOptional: true,
    fault: [$Enums.Faults.F23, $Enums.Faults.F24],
  },
  // CODE: 20702
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Erro F23/f24`,
    isOptional: true,
    fault: [$Enums.Faults.F23, $Enums.Faults.F24],
  },
  // CODE: 20703
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra (carcaça do inversor) e negativo + terra (carcaça do inversor), até estabilizar a tensão no multímetro.`,
    name: `Erro F23/f24`,
    isOptional: true,
    fault: [$Enums.Faults.F23, $Enums.Faults.F24],
  },

  // erro f30
  // CODE: 20801
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Erro F30`,
    isOptional: true,
    fault: [$Enums.Faults.F30],
  },
   // CODE: 20802
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Erro F30`,
    isOptional: true,
    fault: [$Enums.Faults.F30],
  },

  // erro f35 ~~ f46
   // CODE: 20901
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra (Observação: O teste deve ser realizado no conector do inversor).`,
    name: `Erro F35/ F41/ F42/ F43/ F44/ F45/ F46`,
    isOptional: true,
    fault: [
      $Enums.Faults.F35,
      $Enums.Faults.F41,
      $Enums.Faults.F42,
      $Enums.Faults.F43,
      $Enums.Faults.F44,
      $Enums.Faults.F45,
      $Enums.Faults.F46,
    ],
  },
  // CODE: 20902
  {
    productTypeId: 2,
    description: `Enviar vídeo testando continuidade nos bornes CA do inversor.`,
    name: `Erro F35/ F41/ F42/ F43/ F44/ F45/ F46`,
    isOptional: true,
    fault: [
      $Enums.Faults.F35,
      $Enums.Faults.F41,
      $Enums.Faults.F42,
      $Enums.Faults.F43,
      $Enums.Faults.F44,
      $Enums.Faults.F45,
      $Enums.Faults.F46,
    ],
  },
  // CODE: 20903
  {
    productTypeId: 2,
    description: `Enviar foto dos parâmetros de proteção na tela do inversor ou no SOLARMAN.`,
    name: `Erro F35/ F41/ F42/ F43/ F44/ F45/ F46`,
    isOptional: true,
    fault: [
      $Enums.Faults.F35,
      $Enums.Faults.F41,
      $Enums.Faults.F42,
      $Enums.Faults.F43,
      $Enums.Faults.F44,
      $Enums.Faults.F45,
      $Enums.Faults.F46,
    ],
  },

  //f55/f56
  // CODE: 21001
  {
    productTypeId: 2,
    description: `Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Erro F55/ F56`,
    isOptional: true,
    fault: [$Enums.Faults.F55, $Enums.Faults.F56],
  },
  // CODE: 21002
  {
    productTypeId: 2,
    description: `Vídeo medindo tensão CC na ponta de todos os MC4s, positivo + terra (carcaça do inversor) e negativo + terra (carcaça do inversor), até estabilizar a tensão no multímetro.`,
    name: `Erro F55/ F56`,
    isOptional: true,
    fault: [$Enums.Faults.F55, $Enums.Faults.F56],
  },
  // CODE: 21003
  {
    productTypeId: 2,
    description: `Testar continuidade nas entradas CC do inversor com a chave seccionadora em posição ON.`,
    name: `Erro F55/ F56`,
    isOptional: true,
    fault: [$Enums.Faults.F55, $Enums.Faults.F56],
  },

  // f64
  // CODE: 21101
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Erro F64`,
    isOptional: true,
    fault: [$Enums.Faults.F64],
  },
  // CODE: 21102
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Erro F64`,
    isOptional: true,
    fault: [$Enums.Faults.F64],
  },

  // standby
  // CODE: 21201
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `STANDBY/ SELFCHECK`,
    isOptional: true,
    fault: [$Enums.Faults.STANDBY_SELFCHECK],
  },
    // CODE: 21202
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `STANDBY/ SELFCHECK`,
    isOptional: true,
    fault: [$Enums.Faults.STANDBY_SELFCHECK],
  },

  // noise
    // CODE: 21301
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Ruído`,
    isOptional: true,
    fault: [$Enums.Faults.NOISE],
  },
  {
    productTypeId: 2,
    description: `Enviar vídeo medindo tensão CA entre fases, fases + neutro, fases + terra e neutro + terra.`,
    name: `Ruído`,
    isOptional: true,
    fault: [$Enums.Faults.NOISE],
  },
  {
    productTypeId: 2,
    description: `Enviar vídeo do ruído que está apresentando.`,
    name: `Ruído`,
    isOptional: true,
    fault: [$Enums.Faults.NOISE],
  },

  // HYBRID

  // obrigatorio
  // CODE: 30101
  {
    productTypeId: 3,
    description: `Nota fiscal de compra.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30102
  {
    productTypeId: 3,
    description: `Diagrama unifilar.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30103
  {
    productTypeId: 3,
    description: `Datasheet dos módulos.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30104
  {
    productTypeId: 3,
    description: `Datasheet das baterias.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30105
  {
    productTypeId: 3,
    description: `Foto da etiqueta lateral do inversor com número de série.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30106
  {
    productTypeId: 3,
    description: `Vídeo amplo do local de instalação do inversor mostrando o número de série do inversor.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30107
  {
    productTypeId: 3,
    description: `Vídeo amplo do local de instalação dos módulos fotovoltaicos.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30108
  {
    productTypeId: 3,
    description: `Foto da stringbox CC aberta (se existir).`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30109
  {
    productTypeId: 3,
    description: `Foto da stringbox CA aberta.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30110
  {
    productTypeId: 3,
    description: `Datasheet do transformador (se existir).`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30111
  {
    productTypeId: 3,
    description: `Vídeo medindo tensão CA entre fases, fases+neutro, fases+terra e neutro+terra.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30112
  {
    productTypeId: 3,
    description: `Vídeo medindo tensão CC na ponta de todos os MC4s, mostrando bem as ponteiras e visor do multímetro.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30113
  {
    productTypeId: 3,
    description: `Foto da parte inferior do inversor mostrando as MPPTs.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30114
  {
    productTypeId: 3,
    description: `Foto das conexões frontais do inversor híbrido mostrando conexão de bateria, GRID, LOAD e GEN.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30115
  {
    productTypeId: 3,
    description: `Vídeo medindo tensão CC na ponta de todos os MC4s, positivo+terra (carcaça do inversor) e negativo+terra (carcaça do inversor), até estabilizar a tensão no multímetro.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30116
  {
    productTypeId: 3,
    description: `Vídeo medindo tensão das baterias.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30117
  {
    productTypeId: 3,
    description: `Vídeo testando continuidade nos bornes CA do inversor.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30118
  {
    productTypeId: 3,
    description: `Vídeo testando continuidade nas entradas CC do inversor com a chave seccionadora em posição ON.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30119
  {
    productTypeId: 3,
    description: `Vídeo testando continuidade entre a porta GRID e LOAD.`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30120
  {
    productTypeId: 3,
    description: `Vídeo testando continuidade nos terminais de conexão da bateria no inversor (com a bateria desligada).`,
    name: `Obrigatório`,
    isOptional: false,
  },
  // CODE: 30121
  {
    productTypeId: 3,
    description: `Foto da tela TEST DATA (clicar no símbolo de engrenagem, com os botões de cima e baixo apertados, pressionar enter).`,
    name: `Obrigatório`,
    isOptional: false,
  },
];
