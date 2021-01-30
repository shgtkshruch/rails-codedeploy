import * as cdk from "@aws-cdk/core";
import * as route53 from "@aws-cdk/aws-route53";
import * as alias from "@aws-cdk/aws-route53-targets";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";

export const domain = (stack: cdk.Stack, lb: elbv2.ApplicationLoadBalancer) => {
  const DOMAIN_NAME = 'shgtkshruch.com';
  const RECORD_NAME = 'rails-aws-boilerplate';

  const zone = route53.HostedZone.fromLookup(stack, "MyZone", {
    domainName: DOMAIN_NAME
  });

  new route53.ARecord(stack, "AliasRecord", {
    zone,
    recordName: RECORD_NAME,
    target: route53.RecordTarget.fromAlias(new alias.LoadBalancerTarget(lb)),
  });
}
