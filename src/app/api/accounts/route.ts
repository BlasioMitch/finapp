import { NextResponse } from 'next/server';
import { Account } from '@/types';

// In-memory storage for demonstration (replace with database in production)
let accounts: Account[] = [];

export async function GET() {
  try {
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newAccount: Account = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    accounts.push(newAccount);
    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
} 