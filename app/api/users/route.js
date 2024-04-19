import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const users = await clerkClient.users.getUserList();

    console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function POST(request) {
  const reqData = await request.json();
  const {
    external_id,
    first_name,
    last_name,
    email_address,
    phone_number,
    web3_wallet,
    username,
    password,
    skip_password_checks,
    skip_password_requirement,
    public_metadata,
    private_metadata,
    unsafe_metadata,
  } = reqData;

  let formattedData = {
    external_id,
    first_name,
    last_name,
    email_address,
    phone_number,
    web3_wallet,
    username,
    password,
    skip_password_checks,
    skip_password_requirement,
    public_metadata,
    private_metadata,
    unsafe_metadata,
  };
  try {
    const user = await clerkClient.users.createUser(formattedData);

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function PATCH(request) {
  const reqData = await request.json();
  const {
    external_id,
    first_name,
    last_name,
    primary_email_address_id,
    notify_primary_email_address_changed,
    password,
    skip_password_checks,
    sign_out_of_other_sessions,
    public_metadata,
    private_metadata,
    unsafe_metadata,
  } = reqData;

  let formattedData = {
    external_id,
    first_name,
    last_name,
    primary_email_address_id,
    notify_primary_email_address_changed,
    password,
    skip_password_checks,
    sign_out_of_other_sessions,
    public_metadata,
    private_metadata,
    unsafe_metadata,
  };
  const id = request.nextUrl.searchParams.get("id") || false;

  try {
    const user = await clerkClient.users.updateUser(id, formattedData);

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id") || false;
  try {
    const user = await clerkClient.users.deleteUser(id);

    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
