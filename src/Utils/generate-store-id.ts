import { v4 as uuidv4 } from "uuid";

export function generateStoreId(): string {
    return uuidv4();
  }
  