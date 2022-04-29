export interface Mapper<MODEL, DTO> {
  toDTO(model: MODEL): DTO;
}
