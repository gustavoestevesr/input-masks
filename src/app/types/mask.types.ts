export type MaskToken = '#' | 'A' | '*';

export const MASK_REGEX: Record<MaskToken, RegExp> = {
  '#': /\d/,
  A: /[a-zA-Z]/,
  '*': /[a-zA-Z0-9]/,
};

export const MASK_PATTERNS: Record<string, string> = {
  cpf: '###.###.###-##',
  cnpj: '**.***.***/****-##',
  cep: '#####-###',
  phone: '(##) ####-####',
  mobile: '(##) #####-####',
  date: '##/##/####',
  datetime: '##/##/#### ##:##',
  time: '##:##',
  renavam: '###########',
  card: '#### #### #### ####',
  expiration: '##/##',
  cvv: '###',
  uf: 'AA',
  licensePlate: 'AAA-#*##',
};

export type MaskKey = keyof typeof MASK_PATTERNS;
