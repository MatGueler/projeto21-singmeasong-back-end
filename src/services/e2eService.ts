import { truncate } from "../repositories/e2eRepository.js";

export async function reset() {
  await truncate();
}
