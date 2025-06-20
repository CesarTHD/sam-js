export class SaM {
  constructor(program) {
    this.stack = [];
    this.program = program;
    this.pc = 0;
    this.running = true;
  }

  run() {
    while (this.running && this.pc < this.program.length) {
      const line = this.program[this.pc];
      const [instruction, arg] = line.trim().split(" ");
      this.execute(instruction, arg);
      this.pc++;
    }
  }

  execute(instruction, arg) {
    var vTop;
    var vBelow;


    switch (instruction.toUpperCase()) {
      case 'PUSH':
        this.stack.push(Number(arg));
        break;
      case 'POP':
        this.stack.pop();
        break;
      case 'ADD':
      case 'ADDF':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow + vTop);
        }
        break;
      case 'SUB':
      case 'SUBF':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow - vTop);
        }
        break;
      case 'TIMES':
      case 'TIMESF':
        {
          b = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow * b);
        }
        break;
      case 'DIV':
      case 'DIVF':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow / vTop);
        }
        break;
      case 'MOD':
      {
        vTop = this.stack.pop();
        vBelow = this.stack.pop();
        this.stack.push(vBelow % vTop);
      }
      break;
      case 'LSHIFT':
        {
          vTop = this.stack.pop();
          this.stack.push(vTop << Number(arg));
        }
        break;
      case 'RSHIFT':
        {
          vTop = this.stack.pop();
          this.stack.push(vTop >> Number(arg));
        }
        break;
      case 'NOT':
        {
          vTop = this.stack.pop();
          this.stack.push(vTop != 0 ? 0 : 1);
        }
        break;
      case 'OR':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push((vBelow || vTop) == 0 ? 0 : 1);
        }
        break;
      case 'AND':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push((vBelow && vTop) == 0 ? 0 : 1);
        }
        break;
      case 'XOR':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push((vBelow !== vTop) == true ? 1 : 0);
        }
        break;
      case 'NAND':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(!(vBelow && vTop) == true ? 1 : 0);
        }
        break;
      case 'BITNOT':
        {
          vTop = this.stack.pop();
          this.stack.push(~vTop);
        }
        break;
      case 'BITAND':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow & vTop);
        }
        break;
      case 'BITOR':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow | vTop);
        }
        break;
      case 'BITXOR':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow ^ vTop);
        }
        break;
      case 'BITNAND':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(~(vBelow & vTop));
        }
        break;
      case 'GREATER':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow > vTop ? 1 : 0);
        }
        break;
      case 'LESS':
        {
          vTop = this.stack.pop();
          vBelow = this.stack.pop();
          this.stack.push(vBelow < vTop ? 1 : 0);
        }
        break;
      case 'EQUAL':
      {
        vTop = this.stack.pop();
        vBelow = this.stack.pop();
        this.stack.push(vBelow === vTop ? 1 : 0);
      }
      break;
      case 'ISNIL':
      {
        vTop = this.stack.pop();
        this.stack.push(vTop === 0 ? 1 : 0);
      }
      break;
      case 'ISPOS':
      {
        vTop = this.stack.pop();
        this.stack.push(vTop > 0 ? 1 : 0);
      }
      break;
      case 'ISNEG':
      {
        vTop = this.stack.pop();
        this.stack.push(vTop < 0 ? 1 : 0);
      }
      break;
      case 'CMP':
      case 'CMPF':
      {
        vTop = this.stack.pop();
        vBelow = this.stack.pop();
        this.stack.push(vBelow < vTop ? -1 : vBelow > vTop ? 1 : 0);
      }
      break;
      case 'PRINT':
        console.log(this.stack[this.stack.length - 1]);
        break;
      case 'HALT':
        this.running = false;
        break;
      default:
        throw new Error(`Instrução desconhecida: ${instruction}`);
    }
  }
}