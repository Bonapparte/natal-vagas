import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') || '';

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const { jobId } = session.metadata;

    // Atualiza a vaga no Supabase para Premium
    await supabase
      .from('jobs')
      .update({ is_premium: true })
      .eq('id', jobId);
      
    console.log(`Vaga ${jobId} agora é PREMIUM!`);
  }

  return NextResponse.json({ received: true });
}
