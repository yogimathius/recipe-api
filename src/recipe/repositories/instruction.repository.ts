import { EntityRepository, Repository } from 'typeorm';
import { Instruction } from '../entities/instruction.entity';

@EntityRepository(Instruction)
export class InstructionRepository extends Repository<Instruction> {
  // Custom methods can be added here
}
