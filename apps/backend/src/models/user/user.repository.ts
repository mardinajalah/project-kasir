import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { InsertUser, SelectUser, userTable } from '../../db/schema';

export class UserRepository {
  async getAllUser(): Promise<SelectUser[]> {
    return await db.select().from(userTable);
  }

  async getUserById(userId: number): Promise<SelectUser | undefined> {
    const [user] = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);
    return user;
  }

  async getUserByEmail(email: string): Promise<SelectUser | undefined> {
    const [user] = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);
    return user;
  }

  async createUser(newUser: InsertUser) {
    return await db.insert(userTable).values(newUser);
  }

  async updateUser(newUser: Partial<InsertUser>, userId: number) {
    return await db.update(userTable).set(newUser).where(eq(userTable.id, userId));
  }

  async deleteUser(userId: number) {
    return await db.delete(userTable).where(eq(userTable.id, userId));
  }
}
