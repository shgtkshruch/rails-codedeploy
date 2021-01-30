import * as cdk from "@aws-cdk/core";
import * as autoscaling from "@aws-cdk/aws-autoscaling";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";

import { ssmRole } from './ssm'
import { domain as route53  } from './route53'

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
      },
    });

    const vpc = new ec2.Vpc(this, "VPC", {
      maxAzs: 2
    });

    const userData = ec2.UserData.forLinux();
    userData.addCommands("sudo amazon-linux-extras install -y nginx1");
    userData.addCommands("sudo service nginx enable");
    userData.addCommands("sudo service nginx start");

    const asg = new autoscaling.AutoScalingGroup(this, "ASG", {
      minCapacity: 1,
      maxCapacity: 1,
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
      role: ssmRole(this, id),
      userData,
      healthCheck: autoscaling.HealthCheck.elb({
        grace: cdk.Duration.seconds(0),
      }),
    });

    const lb = new elbv2.ApplicationLoadBalancer(this, "LB", {
      vpc,
      internetFacing: true,
    });

    const listener = lb.addListener("Listener", {
      port: 80,
      open: true,
    });

    listener.addTargets("ApplicationFleet", {
      port: 80,
      targets: [asg],
    });

    route53(this, lb)
  }
}
