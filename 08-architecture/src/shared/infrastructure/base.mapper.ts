export interface Mapper<MODEL, DTO_INPUT, DTO_OUTPUT> {
  toDomain(dto: DTO_INPUT): MODEL;
  toDTO(model: MODEL): DTO_OUTPUT;
}
